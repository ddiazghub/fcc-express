# Timestamp Microservice

A microservice which converts timestamps and dates.

## Example Usage

A GET request should be sent to the /api route with a timestamp or date as a parameter:

```console
GET /api/2015-12-25
GET /api/1451001600000
```

## Example Output

The API then returns a JSON object with both the unix timestamp and UTC date string.

```json
{
    "unix": 1451001600000,
    "utc": "Fri, 25 Dec 2015 00:00:00 GMT"
}
```
