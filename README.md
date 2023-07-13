REDIS ile CACHE sistemi

1. redis server kurduk: https://redis.io/docs/getting-started/
2. projemize redis client install ettik `npm i redis`
3. redis import ettik. client oluşturduk. connect ettik:
````
const redis = require('redis');
const client = redis.createClient();

async function connection(){
    await client.connect();
}
connection();
````

4. login'de token'ı cache'e attık:
await client.set(token, 1, {EX: 60*60*3})  //3 saat olarak expire süresi verdik

5. restricted'da token'ı cache'den almaya çalıştık.
const tokenValue = await client.get(token);

6. logout'da token'ı sildik:
await client.del(token);

BONUS: redis server'da cache kontrolü:
> redis-cli
> KEYS *  //cache'deki tüm kayıtları verdi
> FLUSHALL //cache'deki tüm kayıtları siler
