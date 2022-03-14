
function setWithExpiry(key, value, ttl) {
  const now = new Date()

  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  }

  localStorage.setItem(key, JSON.stringify(item))
}


function getWithExpiry(key) {
  const itemStr = localStorage.getItem(key)

  // if the item doesn't exist, return null
  if (!itemStr) {
    return null
  }

  const item = JSON.parse(itemStr)
  const now = new Date()

  // compare the expiry time of the item with the current time
  if (now.getTime() > item.expiry) {
    // if the item is expired, delete the item from storage
    // and return null
    localStorage.removeItem(key)
    return null
  }

  // if the item exists and isn't expired, return it's value
  return item.value
}


export { setWithExpiry, getWithExpiry };