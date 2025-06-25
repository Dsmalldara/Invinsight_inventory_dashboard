'use client'
import React from 'react'
import InventoryTable from './InventoryTable'

function Inventory() {
  return (
    <div className="container mx-auto md:p-4">
      <h1 className="text-2xl font-bold mb-4">Inventory Management</h1>
      <InventoryTable isEditable={true} />
    </div>
  )
}

export default Inventory