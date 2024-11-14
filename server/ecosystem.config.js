module.exports = {
    apps:[
        {
            name: "inventory-management",
            script: "npm",
            args:"run dev",
            env: {
              NODE_ENV: "development",
              PORT: 8000,
            }
        }
    ]
}