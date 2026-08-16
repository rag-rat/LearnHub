
export default function isTokenExpired(tokenTimestamp){
    const currentTimestamp = Math.floor(Date.now() / 1000); // convert milliseconds to seconds
    return currentTimestamp > tokenTimestamp;
}