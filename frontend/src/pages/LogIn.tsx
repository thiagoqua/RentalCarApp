export function LogIn({handleFinished}:{handleFinished:() => void}):JSX.Element{
  return (
    <>
      <h1>you are being login</h1>
      <button onClick={handleFinished}>loguearse</button>
    </>
  )
}