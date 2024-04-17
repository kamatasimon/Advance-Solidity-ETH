import { useGlobalState } from "./store";






const  background = 'https://media.istockphoto.com/id/691745030/photo/perseids-meteor-and-milky-way.jpg?s=1024x1024&w=is&k=20&c=1YwFxvu_QqGWXsDGpNqKChI3ydwrLlJRE-3bh7biGzY='
const Hero = () => {
  const [connectedAccount] = useGlobalState('connectedAccount')

  return(
    <div
    className=" p-60 md:px-40 "
    style={{ background: `url('${background}') fixed no-repeat top/cover `}}
    >
      <div className="flex  items-center justify-between text-white py-5">
    
        <div  className="hidden lg:flex items-center space-x-3 font-semibold opacity-50 ">
          
          
          </div>
          </div>
          {connectedAccount ? (
            <div className="flex justify-between items-center ">
            
            <div className=" flex justify-start items-start pb-5">
              <a
              href={'/Admin'}
              className="bg-orange-600 hover:bg-orange-700 text-white rounded-xl cursor-pointer uppercase shadow-md
              shadow-orange-600 font-bold p-3"
              >Organization Login
              </a>
            </div>
            <div className=" flex pb-5 ">
              <a
              href={'/User'}
              className="bg-orange-600 hover:bg-orange-700 text-white rounded-xl cursor-pointer uppercase shadow-md
              shadow-orange-600 font-bold p-3"
              >User Login
              </a>
            </div>
            </div>
              ) : (
                <div className="flex justify-center items-center text-blue-200 text-4xl font-semibold mt-6">
                  Connect Wallet, Register, and Claim Token
                </div>
              )}
          
          
          
    </div>
  ) 
};

export default Hero;
