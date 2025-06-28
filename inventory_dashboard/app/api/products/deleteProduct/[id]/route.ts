// app/api/products/[id]/route.ts
export const dynamic = 'force-dynamic'; 
import { NextRequest } from 'next/server';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = params.id;
    
    // Your EC2 endpoint for deleting a specific product
    const EC2_ENDPOINT = `http://34.241.99.195/products/deleteProduct/${productId}`;
    
    const response = await fetch(EC2_ENDPOINT, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      console.error(`EC2 server responded with status: ${response.status}`);
      const errorText = await response.text();
      console.error('Error response:', errorText);
      return Response.json(
        { error: `EC2 server error: ${response.status} ${response.statusText}` }, 
        { status: response.status }
      );
    }

    // Check content-type
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const textResponse = await response.text();
      console.error('Expected JSON but got:', contentType, textResponse.substring(0, 200));
      return Response.json(
        { error: 'EC2 server returned non-JSON response' }, 
        { status: 502 }
      );
    }

    const data = await response.json();
    
    return Response.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });

  } catch (error) {
    console.error('Proxy error:', error);
    
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return Response.json(
        { error: 'Unable to connect to EC2 server. Check if server is running.' }, 
        { status: 503 }
      );
    }
    
    if (error instanceof SyntaxError && error.message.includes('JSON')) {
      return Response.json(
        { error: 'EC2 server returned invalid JSON response' }, 
        { status: 502 }
      );
    }
    
    return Response.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}