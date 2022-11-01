"use strict"

module.exports = {
    parseWallets: str => {
        const lines = str.split(/\n|\r\n/);
        return lines.map( line => line.trim().split(":"));
    },
    parseLog: log => {
        
    }
}
