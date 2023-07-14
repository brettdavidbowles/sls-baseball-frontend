import Header from './Header'

export default function Layout({ children }: { children: React.ReactElement<any> }) {

  return (
    <div className='w-full layout'>
      <Header />
      <div id="obdiv" className='h-1 absolute top-0'></div>
      <div className='p-4'>
        {children}
        {/* {
          React.cloneElement(children, {
            isLoggedIn: isLoggedIn
          })
        } */}
      </div>
    </div>
  )
}