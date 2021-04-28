const http = require('http')

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/signup',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
}

const body = JSON.stringify({
  name: 'Admin',
  email: 'admin@gaivota.ai',
  password: 'admin'
})

const req = http.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', d => {
    process.stdout.write(d)
  })
})

req.write(body)
req.on('error', error => {
  console.error(error)
})
req.on('response', res => {
  let data = ''
  res.on('data', chunk => {
    data += chunk
  })
  res.on('end', () => {
    console.log(data)
  })
})
req.end()
