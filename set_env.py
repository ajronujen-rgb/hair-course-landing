import json, subprocess, os

with open('C:/Users/Name/Downloads/barrymore-leads-59b88d5d7f20.json') as f:
    sa = json.load(f)

key = sa['private_key']
email = sa['client_email']

print(f'Установка GOOGLE_PRIVATE_KEY...')
proc = subprocess.run(
    ['npx', 'vercel', 'env', 'add', 'GOOGLE_PRIVATE_KEY', 'production'],
    input=key.encode(),
    capture_output=True,
    text=True,
    timeout=30,
    cwd='D:/Курс наращивания волос/site'
)
print(proc.stdout)
if proc.stderr: print('ERR:', proc.stderr[:200])

print('\nГотово! Переменные:')
print(f'GOOGLE_SERVICE_ACCOUNT_EMAIL = {email}')  
print(f'GOOGLE_SHEET_ID = 1WaXikafbAmBbRVcONqFDHin2_RFWx34TeX-ds6f-FtM')
print(f'GOOGLE_PRIVATE_KEY = установлен')