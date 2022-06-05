
const Notification = ( { value, color } ) => {
  return (
    <div className={`bg-${color}-100 border-t border-b border-blue-500 text-${color}-700 px-4 py-3`} role="alert">
      <p className='font-bold'>{value}</p>
    </div>
  )
}

export default Notification