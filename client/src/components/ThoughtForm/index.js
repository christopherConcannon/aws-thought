import React, { useState, useRef } from 'react'

const ThoughtForm = () => {
	const [ formState, setFormState ] = useState({ username: '', thought: '' })
	const [ characterCount, setCharacterCount ] = useState(0)

	const fileInput = useRef(null)

	// update state based on form input changes
	const handleChange = (event) => {
		if (event.target.value.length <= 280) {
			setFormState({ ...formState, [event.target.name]: event.target.value })
			setCharacterCount(event.target.value.length)
		}
	}

	// upload image file
	const handleImageUpload = (event) => {
		event.preventDefault()
    // configure image file to be sent
		const data = new FormData()
		data.append('image', fileInput.current.files[0])
		// send image file to endpoint with the postImage function
		const postImage = async () => {
			try {
				const res = await fetch('/api/image-upload', {
					mode   : 'cors',
					method : 'POST',
					body   : data
				})
				if (!res.ok) throw new Error(res.statusText)
				const postResponse = await res.json()
				setFormState({ ...formState, image: postResponse.Location })

				return postResponse.Location
			} catch (err) {
				console.log(err)
			}
		}
		postImage()
	}

	// submit form
	const handleFormSubmit = (event) => {
		event.preventDefault()
		// POST method with formState
		const postData = async () => {
			const res = await fetch('/api/users', {
				method  : 'POST',
				headers : {
					Accept         : 'application/json',
					'Content-Type' : 'application/json'
				},
				body    : JSON.stringify(formState)
			})
			const data = await res.json()
			console.log(data)
		}
		postData()
		// clear form value
		setFormState({ username: '', thought: '' })
		setCharacterCount(0)
	}

	return (
		<div>
			<p className={`m-0 ${characterCount === 280 ? 'text-error' : ''}`}>
				Character Count: {characterCount}/280
				{/* {error && <span className="ml-2">Something went wrong...</span>} */}
			</p>
			<form
				className='flex-row justify-center justify-space-between-md align-stretch'
				onSubmit={handleFormSubmit}
			>
				<input
					placeholder='Name'
					name='username'
					value={formState.username}
					className='form-input col-12 col-md-9'
					onChange={handleChange}
				/>
				<textarea
					placeholder='Here&#39;s a new thought...'
					name='thought'
					value={formState.thought}
					className='form-input col-12 col-md-9'
					onChange={handleChange}
				/>
				<label className='form-input col-12 p-1'>
					Add an image to your thought:
					<input type='file' className='form-input p-2' ref={fileInput} />
					<button type='submit' className='btn' onClick={handleImageUpload}>
						Upload
					</button>
				</label>
				<button className='btn col-12 col-md-3' type='submit'>
					Submit
				</button>
			</form>
		</div>
	)
}

export default ThoughtForm
