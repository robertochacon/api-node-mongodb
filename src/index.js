import '@babel/polyfill'
import app from './server'
import { connect } from './database'

async function main() {
    await app.listen(app.get('port'));
    console.log('server: ', app.get('port'));
}

main();