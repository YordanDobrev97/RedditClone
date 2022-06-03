import React from "react"
import { Link } from 'react-router-dom'
function Nav() {
  
  return (
    <header>
			<div className="px-5 w-full fixed h-12 bg-white border-grey-lightest border-b flex items-center">
				<div className="container mx-auto flex">
					<div className="w-3/5 flex">
						<div className="w-1/5">
							<Link to='/home'>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Reddit_logo.svg/2560px-Reddit_logo.svg.png" alt="reddit-logo"/>
              </Link>
						</div>
						<div className="w-full mx-5">
							<div className="flex items-center w-auto h-full pl-8 pr-2 border border-grey-lightest hover:border-blue rounded relative">
								<input className="text-sm w-full" type="text" name="search" placeholder="Search" />
							</div>
						</div>
					</div>
					<div className="w-2/5 flex justify-end items-center">
						<Link to='/login' className="border px-8 py-2.5 font-semibold text-xs rounded ml-4">LOG IN</Link>
						<Link to='/register' className="border px-8 py-2.5 font-semibold text-xs rounded ml-4">SIGN UP</Link>
					</div>
				</div>
			</div>
		</header>
  );
}

export default Nav;