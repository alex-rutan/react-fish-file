import "./Alert.css"

/** Alert: alert component, used to create a flash message alert of provided type
 *
 *  Props: type, messages
 */

function Alert({ type, messages }) {
  if (type === null) return null;

  return (
    <div className={`alert alert-${type} alert-dismissible fade show`} role="alert">
      <strong>
        {messages.map((m, i) =>
          <p key={i}>
            {m.startsWith("instance.") ?
              m.slice(9)
              :
              m
            }
          </p>
        )}
      </strong>
      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  )
}

export default Alert;