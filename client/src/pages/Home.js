import React, { useState, useEffect } from 'react'
import ThoughtList from '../components/ThoughtList'
import ThoughtForm from '../components/ThoughtForm'

const Home = () => {
	const [ isLoaded, setIsLoaded ] = useState(false)
	const [ thoughts, setThoughts ] = useState([])

	// const loggedIn = Auth.loggedIn();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch('/api/users')
				const data = await res.json()
				// sort the array by createdAt property ordered by descending values
				const orderData = data.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
				setThoughts(orderData)
				setIsLoaded(true)
			} catch (err) {
				console.log(err)
			}
		}
		fetchData()
		// only run once when component mounts
		// NOTE...if we add thoughts to the dependency array in order to make the component re-render when the user adds a new thought, it will cause an infinite loop of fetch requests to /api/users.
		// }, [thoughts])
	}, [])

	useEffect(() => {}, [ thoughts ])

	//  HAD TO CHANGE TO THIS TO GET THE DEPLOYMENT ON AWS TO WORK
	// import React, { useState, useEffect } from 'react'
	// import ThoughtList from '../components/ThoughtList'
	// import ThoughtForm from '../components/ThoughtForm'

	// const Home = () => {
	//         const [ isLoaded, setIsLoaded ] = useState(false)
	//         const [ thoughts, setThoughts ] = useState([])

	//         // const loggedIn = Auth.loggedIn();

	//         useEffect(() => {
	//                 const fetchData = async () => {
	//                         try {
	//                                 const res = await fetch('http://3.12.166.143/api/users')
	//                                 const data = await res.json()

	//                                 setThoughts(data)
	//                                 setIsLoaded(true)
	//                         } catch (err) {
	//                                 console.log(err)
	//                         }
	//                 }
	//                 fetchData()
	//                 // only run once when component mounts
	//     // NOTE...if we add thoughts to the dependency array in order to make the component re-render when the user adds a new thought, it will cause an infinite loo$        // }, [thoughts])
	//         }, [])

	//   useEffect(() => {
	//   },[thoughts])

	return (
		<main>
			<div className='flex-row justify-space-between'>
				<div className='col-12 mb-3'>
					<ThoughtForm />
				</div>
				<div className={`col-12 mb-3 `}>
					{!isLoaded ? (
						<div>Loading...</div>
					) : (
						<ThoughtList thoughts={thoughts} title='Some Feed for Thought(s)...' />
					)}
				</div>
			</div>
		</main>
	)
}

export default Home
