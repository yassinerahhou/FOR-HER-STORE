import urllib.request

with open('source_deploy.zip', 'rb') as f:
    data = f.read()

boundary = '---------------------------974767299852498929531610575'
header = (
    f'--{boundary}\r\n'
    'Content-Disposition: form-data; name="reqtype"\r\n\r\n'
    'fileupload\r\n'
    f'--{boundary}\r\n'
    'Content-Disposition: form-data; name="fileToUpload"; filename="source_deploy.zip"\r\n'
    'Content-Type: application/zip\r\n\r\n'
).encode('utf-8')
footer = f'\r\n--{boundary}--\r\n'.encode('utf-8')

body = header + data + footer

req = urllib.request.Request(
    'https://catbox.moe/user/api.php',
    data=body,
    headers={
        'Content-Type': f'multipart/form-data; boundary={boundary}',
        'User-Agent': 'Mozilla/5.0'
    }
)

with urllib.request.urlopen(req) as response:
    print(response.read().decode('utf-8'))
