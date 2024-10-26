/* eslint-disable react/jsx-key */
import React from 'react'
import { frames } from '../frames'
import { Button } from 'frames.js/next'
import quizData from '../../../data/quiz.json'

// State management
let currentQuestionIndex = 0
let score = 0

export const frameHandler = frames(async (ctx) => {
	const { pressedButton, searchParams } = ctx

	const baseUrl = ctx.url.origin

	// Check if we need to reset the quiz
	if (searchParams.reset === 'true') {
		currentQuestionIndex = 0
		score = 0
	}

	let questions = quizData.questions

	console.log('currentQuestionIndex', currentQuestionIndex)

	// Check answer and update score if a button was pressed
	if (pressedButton && !searchParams.reset) {
		let buttonIndex = parseInt(pressedButton.index) - 1
		const currentQuestion = questions[currentQuestionIndex]
		if (buttonIndex === currentQuestion.correctAnswer) {
			score += 2
		}
		currentQuestionIndex++
	}

	// Ensure currentQuestionIndex is within bounds
	if (currentQuestionIndex >= questions.length) {
		let message = ''
		// Quiz is finished
		if (score === 0) {
			message =
				' Fries Hater: Okay, so it seems like you’re not quite on the fry-loving train yet. With 0 $fries in your fry fund, you might need a little extra convincing when it comes to the true majesty of fries. But hey, there’s always room for a change of heart, especially when it comes to something as amazing as fries! Let’s turn those zero fries into full-on fry fan frenzy, one crispy bite at a time. 😉🍟💕'
		}
		if (score === 2) {
			message =
				'Fries Explorer: You may be new to the fry scene, but your exploration skills are next level! With 2 $fries in your pocket, you’re on the path to becoming a true Fries Explorer, discovering all the wonders that fries have to offer. Keep that adventurous spirit alive and watch as you uncover even more fry-tastic treasures along the way! 🕵️‍♀️🔍🍟'
		}
		if (score === 4) {
			message =
				'Fries Cutie: Serving up major cuteness in the world of fries, you’ve secured 4 $fries to add to your fry collection! Your sweet, cheeky vibes make you the ultimate Fries Cutie, bringing joy and fun to every fry-focused moment. Keep being your adorable self and watch as the fry world swoons in delight! 🍟💕😘'
		}
		if (score === 6) {
			message =
				'Fries Bestie: With 6 $fries to your name, you’re not just a Fries Bestie - you’re the ultimate friend to fries everywhere! Your love for the crispy cuties shines through, earning you a top spot in the Fries Hall of Fame. Keep spreading that bestie magic and sharing the fry love wherever you go! 🤗💖🍟'
		}
		if (score === 8) {
			message =
				'Fries Baddie: Crushing it on the fries front, you’ve officially reached Fries Baddie status! You’ve landed 8 $fries simply by being the sassiest, baddest babe in the fry game. Keep that energy up and watch as you continue to dominate the Fries Universe like a true baddie boss! 💅🍟'
		}
		if (score === 10) {
			message =
				'Fboy Slayer: You’re the ultimate Fboy Slayer - the one true legend in the world of fries! Your $fries count just hit 10, and you’ve earned every single one with your exceptional skills. Keep slaying those Fboys and fries like the absolute queen you are! 🍟👑✨'
		}

		return {
			image: (
				<div
					style={{
						backgroundImage: `url(${baseUrl}/bg2.png)`, // Replace with your image path
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						width: '100%',
						height: '100%',
					}}
					tw="bg-pink-100 px-10 text-pink-600 text-center w-full h-full flex flex-col justify-center items-center"
				>
					<p
						style={{
							fontWeight: 700,
							fontSize: '28px',
							lineHeight: '1.4',
						}}
					>
						{message}
					</p>
				</div>
			),
			buttons: [
				<Button action="post" target={{ pathname: '/quiz', query: { reset: 'true' } }}>
					Restart Quiz
				</Button>,
			],
		}
	}

	const currentQuestion = questions[currentQuestionIndex]
	// Render current question
	return {
		image: (
			<div
				style={{
					backgroundImage: `url(${baseUrl}/bg2.png)`, // Replace with your image path
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					width: '100%',
					height: '100%',
				}}
				tw="bg-pink-100 text-center px-10 text-pink-600 w-full h-full flex flex-col justify-center items-center"
			>
				{/* <h2 tw="text-2xl font-bold mb-4">Question {currentQuestionIndex + 1}</h2> */}
				<h2
					style={{
						fontWeight: 700,
						fontSize: '48px',
						lineHeight: '1.2',
					}}
				>
					{currentQuestion.question}
				</h2>
			</div>
		),
		buttons: currentQuestion.answers.map((answer, index) => (
			<Button key={answer} action="post" value={answer} target={{ pathname: '/quiz' }}>
				{answer}
			</Button>
		)),
	}
})

export const GET = frameHandler
export const POST = frameHandler

// Reset quiz state when restarting
export const resetQuiz = () => {
	currentQuestionIndex = 0
	score = 0
}
