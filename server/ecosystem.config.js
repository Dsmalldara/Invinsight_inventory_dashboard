module.exports = {
    apps:[
        {
            name: "inventory-management",
            script: "npm",
            args:"run dev",
            env: {
              NODE_ENV: "development",
              PORT: 8000,
              FRONTEND_PORT: "http://localhost:3000",
              DATABASE_URL:"postgresql://postgres.ftnlurapzxijrmtolrfr:Dadadarasimi1@aws-0-eu-west-2.pooler.supabase.com:5432/postgres?pgbouncer=true&connection_limit=1"
            }
        }
    ]
}