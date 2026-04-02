import { Link } from "react-router-dom"



export default function Dashboard(){
    return (
      <section className="relative" style={{width:"95%",marginLeft:"5%",height:"100vh"}}>
      {/* Hero Banner */}
      <div className="relative h-[600px] bg-gradient-to-r from-red-500 to-orange-400 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url('LandingImg.jpg')`

          }}
        />
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center" >
          <div className="max-w-2xl">
          
            
            <h1 className=" text-6xl font-bold text-white mb-6">
              Welcome To Your  <br />
              Resturant Dashboard
            </h1>
            
            <p className="text-xl text-white/90 mb-8">
               from here you can manage your Resturant Menu with ease 
            </p>
            
            <div className="flex flex-wrap gap-4">
            
             <Link to={"/dashboard/Menu"}><button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors">
                View Menu 
              </button></Link> 
             <Link to={"/dashboard/categories"}><button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors">
                View Categories 
              </button></Link> 
              
            </div>
          </div>
        </div>
      </div>

     
  

  
   
    </section>
      
    )
}