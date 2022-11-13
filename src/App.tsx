import {
  chakra,
  Box,
  Flex,
  Image,
  Text,
  VStack,
  shouldForwardProp,
  keyframes,
  HStack,
  Icon,
} from '@chakra-ui/react'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
import { tsParticles, ZIndex } from 'tsparticles-engine'
import { useCallback } from 'react'
import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import Countdown from 'react-countdown'

const App = () => {
  const layout = {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: 'blue',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }


  const titleText = {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '36px',
    lineHeight: '1.5',
    padding: '2px 8px',
    backgroundColor: 'orange',
    ZIndex: '10',
    position: 'relative',
    borderRadius: '8px',
    margin: '28px 0',
    minWidth: '300px',
    textAlign: 'center',
  }
  const dateText = {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '36px',
    lineHeight: '0.9',
  }
 
  const wordText = {
    color: 'white',
    fontSize: '28px',
    lineHeight: '1.2',
  }

  const jobText = {
    color: 'white',
    fontSize: '32px',
  }

  const cursorKeyframe = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }

  `

  const cursor = {
    backgroundColor: 'orange',
    height: '32px',
    width: '3px',
    animation: `${cursorKeyframe} 1s infinite`,
    margin: '4px 0 0 4px',
  }

  const Completionist = () => <span>It's time!</span>

  type countdownType = {
    days: number
    hours: number
    minutes: number
    seconds: number
    completed: boolean
  }
  const renderer = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: countdownType) => {
    if (completed) {
      // Render a completed state
      return <Completionist />
    } else {
      // Render a countdown
      return (
        <span>
          {days}d<chakra.span color="orange">-</chakra.span>
          {hours}h<chakra.span color="orange">-</chakra.span>
          {minutes}m
        </span>
      )
    }
  }

  const rendererLatest = ({
    hours,
    minutes,
    seconds,
    completed,
  }: countdownType) => {
    if (completed) {
      // Render a completed state
      return <Completionist />
    } else {
      // Render a countdown
      return (
        <span>
          {hours}:{minutes}:{seconds}
        </span>
      )
    }
  }

  let wordList = [
    'นับถอยหลังวันได้รับเงินทุน',
    '4 สัปดาห์ - 6 สัปดาห์',
    'เงินทุนของปีการศึกษาที่แล้ว',
  ]

  const [wordIndex, setWordIndex] = useState(0)
  const [letterIndex, setLetterIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const handle = setTimeout(() => {
      if (letterIndex === wordList[wordIndex].length) {
        setIsDeleting(true)
      } else if (letterIndex === 0) {
        setIsDeleting(false)
        setWordIndex((wordIndex) => (wordIndex + 1) % wordList.length)
      }

      setLetterIndex((letterIndex) =>
        isDeleting ? letterIndex - 1 : letterIndex + 1
      )
    }, 72)

    return () => {
      clearTimeout(handle)
    }
  }, [isDeleting, letterIndex])

  const particlesInit = useCallback(async (engine: any) => {
    console.log(engine)
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine)
  }, [])

  const particlesLoaded = useCallback(async (container: any) => {
    await console.log(container)
  }, [])

  const getScholarshipDateEarliest = new Date('November 28, 2022 00:00:00')
  const getScholarshipDateLatest = new Date('December 12, 2022 00:00:00')

  return (
    <>
      <Box sx={layout}>
        <VStack width="50%" alignItems="center">
          <Text sx={titleText}>CP Scholarship Countdown</Text>
          <Text sx={dateText}>
            <Flex>
              <Text width="156px" alignItems="center">
                Fastest<chakra.span color="orange"> :</chakra.span>{' '}
              </Text>
              <Countdown
                date={getScholarshipDateEarliest}
                renderer={renderer}
              />
            </Flex>
            <br />
            <Flex>
              <Text width="156px" alignItems="center">
                Latest<chakra.span color="orange"> :</chakra.span>{' '}
              </Text>
              <Countdown date={getScholarshipDateLatest} renderer={renderer} />
            </Flex>
          </Text>
          <Flex alignItems="center" height="88px">
            <Text sx={wordText}>
              {wordList[wordIndex].substring(0, letterIndex)}
            </Text>
            <Box sx={cursor} />
          </Flex>
        </VStack>

        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            particles: {
              number: {
                value: 160,
                density: { enable: true, value_area: 800 },
              },
              color: { value: '#ffffff' },
              shape: {
                type: 'circle',
                stroke: { width: 0, color: '#000000' },
                polygon: { nb_sides: 5 },
                image: { src: 'img/github.svg', width: 100, height: 100 },
              },
              opacity: {
                value: 1,
                random: true,
                anim: { enable: true, speed: 1, opacity_min: 0, sync: false },
              },
              size: {
                value: 3,
                random: true,
                anim: { enable: false, speed: 4, size_min: 0.3, sync: false },
              },
              line_linked: {
                enable: false,
                distance: 150,
                color: '#ffffff',
                opacity: 0.4,
                width: 1,
              },
              move: {
                enable: true,
                speed: 1,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: { enable: false, rotateX: 600, rotateY: 600 },
              },
            },
            interactivity: {
              detect_on: 'canvas',
              events: {
                onhover: { enable: true, mode: 'bubble' },
                onclick: { enable: true, mode: 'repulse' },
                resize: true,
              },
              modes: {
                grab: { distance: 400, line_linked: { opacity: 1 } },
                bubble: {
                  distance: 250,
                  size: 0,
                  duration: 2,
                  opacity: 0,
                  speed: 3,
                },
                repulse: { distance: 400, duration: 0.4 },
                push: { particles_nb: 4 },
                remove: { particles_nb: 2 },
              },
            },
            retina_detect: true,
          }}
        />
      </Box>
    </>
  )
}

export default App
