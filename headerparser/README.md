# Request Header Parser Microservice

An API which parses an incoming request's headers and responds with the client's public ip address, the client's language and the client's browser software.

## Example Usage

A GET request should be sent to the /api/whoami route:

```console
GET /api/whoami
```

## Example Output

```json
{
    "ipaddress": "159.20.14.100",
    "language": "en-US,en;q=0.5",
    "software": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:50.0) Gecko/20100101 Firefox/50.0"
}
```
