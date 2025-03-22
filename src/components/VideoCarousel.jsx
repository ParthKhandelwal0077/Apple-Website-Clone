import React from 'react'
import { hightlightsSlides } from '../constants'
import { useRef, useState , useEffect} from 'react'
import { replayImg, playImg, pauseImg } from '../utils';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
const VideoCarousel = () => {
    const videoRef = useRef([]);
    const videoSpanRef = useRef([]);
    const videoDivRef = useRef([]);

    const [video,setVideo] = useState({
        isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
    });

  const [loadedData, setLoadedData] = useState([])
  ;
  const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video;

  useGSAP(() => {
    // slider animation to move the video out of the screen and bring the next video in
    gsap.to("#slider", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: "power2.inOut", // show visualizer https://gsap.com/docs/v3/Eases
    });

    // video animation to play the video when it is in the view
    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((pre) => ({
          ...pre,
          startPlay: true,
          isPlaying: true,
        }));
      },
    });
  }, [isEnd, videoId]);

    useEffect(() => {
        if(loadedData.length>3){
            if(!isPlaying){
                videoRef.current[videoId].pause();
            }else{
                startPlay && videoRef.current[videoId].play();
            }
        }
    }, [startPlay,videoId,isPlaying,loadedData])
    useEffect(() => {
        const currentProgress =0;
        let span = videoSpanRef.current;

        if(span[videoId]){
            let anim = gsap.to(span[videoId],{
                onUpdate:()=>{

                },
                onComplete:()=>{
                    
                }
            })
        }
        
    },[videoId,startPlay])
const handleProcess = (type, i) => {
    switch (type) {
      case "video-end":
        setVideo((pre) => ({ ...pre, isEnd: true, videoId: i + 1 }));
        break;

      case "video-last":
        setVideo((pre) => ({ ...pre, isLastVideo: true }));
        break;

      case "video-reset":
        setVideo((pre) => ({ ...pre, videoId: 0, isLastVideo: false }));
        break;

      case "pause":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;

      case "play":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;

      default:
        return video;
    }
  };

  const handleLoadedMetaData = (i, e) => setLoadedData((pre) => [...pre, e]);
  return (
    <>
   <div className="flex items-center">
    {hightlightsSlides.map((list,i)=>(
        <div id="slider" key={list.id} className="sm:pr-20 pr-10">
            <div className="video-carousel_container">
                <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                    <video src={list.video}
                    type='video/mp4'
                    playsInline preload={true} muted id="video"
                    ref={(el)=>(videoRef.current[i]=el)}
                    onPlay={()=>{
                        setVideo(
                            (prevVideo)=>({
                                ...prevVideo,isPlaying:true
                            })
                        )
                    }}
                    onLoadedMetadata={(e)=>handleLoadedMetaData(i,e)}
                    ></video>
                </div>
                <div className="absolute top-12 left-[5%] z-10">
                    {list.textLists.map((text,i)=>(
                        <p key={i} className="md:text-2xl text-xl font-medium">{text}</p>
                    ))}
                </div>
                

            </div>
            
        </div>
    ))}
   </div>
   <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
            {videoRef.current.map((_,i)=>{
                <span key={i}
                ref={(el)=>(videoDivRef.current[i]=el)} className='mx-2 w-3 h-3 rounded-full bg-gray-200 relative cursor-pointer'>
                    <span className="absolute h-full w-full rounded-full" ref={(el)=>(videoSpanRef.current[i]=el)}/>
                     
                </span>
            })}
        </div>
        <button className="crontrol-btn">
            <img src={isLastVideo?replayImg:!isPlaying?playImg:pauseImg} alt={isLastVideo?'replay':'pause'}
            onClick={isLastVideo?()=>handleProcess('video-reset'):!isPlaying?()=>handleProcess('play'):()=>handleProcess('pause')}
            />
        </button>
   </div>

   </>
  )
}

export default VideoCarousel
