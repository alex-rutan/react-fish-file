
function setWithExpiration(key, value, ttl) {
  const now = new Date()

  const item = {
    value: value,
    expiration: now.getTime() + ttl,
  }

  localStorage.setItem(key, JSON.stringify(item))
}


function getWithExpiration(key) {
  const itemStr = localStorage.getItem(key)

  // if the item doesn't exist, return null
  if (!itemStr) {
    return null
  }

  const item = JSON.parse(itemStr)
  const now = new Date()

  // compare the expiration time of the item with the current time
  if (now.getTime() > item.expiration) {
    // if the item is expired, delete the item from storage
    // and return null
    localStorage.removeItem(key)
    return null
  }

  // if the item exists and isn't expired, return it's value
  return item.value
}


export { setWithExpiration, getWithExpiration };