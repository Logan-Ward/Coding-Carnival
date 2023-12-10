import { CSSProperties, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import { useEffect } from 'react';
import Directory from './directory/directory';
import gsap from 'gsap';

function App() {
  const [circles, setCircles] = useState([]);
  const [end, setEnd] = useState(false);
  const [timelines, setTimelines] = useState([]);

  // Populates the screen with svg circles of random sizes and positions
  const makeCircles = () => {
    let tempCircles: any = [];
    for (let i = 0; i < 80; i++) {
      tempCircles.push(
        <circle
          cx={`${Math.random() * 100}%`}
          cy={`${Math.random() * 100}%`}
          r={`${Math.random() * 2}%`}
          className={`${styles.circle} l${i}`}
          key={i}
          id={`l${i}`}
        />
      );
    }
    setCircles(tempCircles);
  };

  useEffect(() => {
    makeCircles();
  }, []);

  useEffect(() => {
    if (circles.length === 80 && !end) {
      let tempTimelines: any = [];
      for (let i = 0; i < 80; i++) {
        //TODO: Fix bug where circles all fade out together then start randomizing properly when site is loaded
        let tl = gsap.timeline({ repeat: -1, repeatRefresh: true });

        // Raindrops version
        tl.to(
          `#l${i}`,
          {
            attr: { opacity: 0, r: 'random(.3, 2.1)%' },
            duration: gsap.utils.random(1, 3, true), // Speed this up to make it look more like rain
          },
          '>'
        );

        tl.set(
          `#l${i}`,
          {
            attr: {
              opacity: 1,
              r: '0%',
              cx: 'random(0, 100)%',
              cy: 'random(0, 100)%',
            },
          },
          '>'
        );

        tl.to(
          `#l${i}`,
          {
            duration: gsap.utils.random(1, 2, true),
          },
          '<'
        );

        // Growing and shrinking orbs version
        // tl.to(`#l${i}`, {
        //   attr: { opacity: 1, r: "random(.3, 2.1)%" },
        //   duration: gsap.utils.random(1, 3, true)
        // }, ">");

        // tl.to(`#l${i}`, {
        //   attr: { opacity: 0, r: '0%' },
        //   duration: gsap.utils.random(1, 3, true)
        // }, ">");

        // tl.to(`#l${i}`, {
        //   attr: { cx: "random(0, 100)%", cy: "random(0, 100)%" },
        //   duration: gsap.utils.random(1, 2, true)
        // }, ">");

        tempTimelines.push([tl, i]);
      }
      setTimelines(tempTimelines);
    }
  }, [circles, end]);

  useEffect(() => {
    if (end) {
      timelines.forEach((tl: any) => tl[0].killTweensOf(`#l${tl[1]}`));
    }
  }, [end]);

  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" className={styles.svg}>
        {circles}
      </svg>
      <h1 className={styles.h1}>Logan's Coding Carnival</h1>
      <input
        type="button"
        value={end ? 'On' : 'Off'}
        style={{
          backgroundColor: end ? 'white' : 'black',
          color: end ? 'black' : 'white',
          borderColor: end ? 'black' : 'white',
        }}
        className={styles['circle-button']}
        onClick={() => setEnd(!end)}
      />
      <main>
        <Directory />
      </main>
    </>
  );
}

export default App;

// import { CSSProperties } from 'react';
// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// import styles from './app.module.scss';
// import { gsap } from 'gsap';
// import { useEffect } from 'react';

// function App () {
//   useEffect( () => {
//     var xlink   = "http://www.w3.org/1999/xlink";
//     var imgUrl  = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/106114/ripple512.png";
//     var feImage = document.querySelector("feImage");
//     let bod = document.querySelector("body");

//     toBase64(imgUrl, function(data) {

//       feImage.setAttributeNS(xlink, "xlink:href", data);

//       var tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

//       tl.to("#displacement-map", { attr: { scale: 100 }, duration: 1.5}, 0)
//       tl.to("feImage", { attr: { x: -125, y: -125, width: "150%", height: "150%" }, duration: 1.5}, 0);
//     });

//     function toBase64(url, callback){
//       var img = new Image();
//       img.crossOrigin = "anonymous";
//       img.onload = function(){
//         var canvas = document.createElement("canvas");
//         var ctx = canvas.getContext("2d");
//         canvas.height = this.height;
//         canvas.width = this.width;
//         ctx.drawImage(this, 0, 0);
//         var dataURL = canvas.toDataURL("image/png");
//         callback(dataURL);
//         canvas = null;
//       };

//       img.src = url;
//     }
//   })
//   return (
//     <main>
//       <svg className={styles.svg}>
//         <defs>
//           <filter id="ripple-filter">
//             <feImage x="250" y="250" width="0%" height="0%" result="rippleImage" />

//             <feDisplacementMap id="displacement-map"
//                               xChannelSelector="R"
//                               yChannelSelector="G"
//                               in="SourceGraphic"
//                               in2="rippleImage"
//                               result="displacementMap"
//                               colorInterpolationFilters="sRGB"
//                               scale="0" />

//             <feComposite operator="in" in2="rippleImage"></feComposite>
//           </filter>
//         </defs>

//         <g id="logo">
//           <image id="logo-image"
//                 width="500"
//                 height="500"
//                 xlinkHref="src/assets/pexels-nicole-avagliano-2312040.jpg" />

//           <image id="logo-overlay"
//                 width="500"
//                 height="500"
//                 xlinkHref="src/assets/pexels-nicole-avagliano-2312040.jpg"
//                 filter="url(#ripple-filter)" />
//         </g>
//       </svg>
//     </main>
//   );
// }

// export default App;
