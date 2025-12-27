import{j as e}from"./motion-C26BWbv8.js";import{r}from"./vendor-BFLsp65Y.js";const v=({src:u,alt:a,className:n="",webpSrc:c,avifSrc:d,...f})=>{const[i,l]=r.useState(!1),[o,m]=r.useState(!1),[g,p]=r.useState(!1),s=r.useRef(null);r.useEffect(()=>{const t=new IntersectionObserver(([x])=>{x.isIntersecting&&(m(!0),t.disconnect())},{threshold:.1,rootMargin:"50px"});return s.current&&t.observe(s.current),()=>{s.current&&t.unobserve(s.current),t.disconnect()}},[]);const h=()=>{l(!0)},y=()=>{p(!0),l(!0)};return e.jsxs("div",{ref:s,className:`lazy-image-wrapper ${n}`,style:{position:"relative",overflow:"hidden"},children:[!i&&e.jsx("div",{className:"lazy-image-placeholder",style:{position:"absolute",inset:0,background:"linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",backgroundSize:"200% 100%",animation:"shimmer 1.5s infinite"},"aria-hidden":"true"}),g?e.jsx("div",{className:"lazy-image-error",style:{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",background:"#f0f0f0",color:"#999",fontSize:"14px"},children:a||"Image"}):e.jsxs("picture",{children:[d&&o&&e.jsx("source",{srcSet:d,type:"image/avif"}),c&&o&&e.jsx("source",{srcSet:c,type:"image/webp"}),e.jsx("img",{src:o?u:void 0,alt:a,loading:"lazy",onLoad:h,onError:y,className:`lazy-image ${i?"loaded":""} ${n}`,style:{opacity:i?1:0,transition:"opacity 0.3s ease-in-out",width:"100%",height:"100%",objectFit:"cover"},...f})]}),e.jsx("style",{children:`
                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
                .lazy-image.loaded {
                    opacity: 1;
                }
            `})]})};export{v as L};
