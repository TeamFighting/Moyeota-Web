// import { useEffect, useRef } from 'react';
// import { BOTTOM_SHEET_MIN_Y, BOTTOM_SHEET_MAX_Y } from '../Constants/Constant';

// interface BottomSheetMetrics {
//   touchStart: {
//     sheetY: number;
//     touchY: number;
//   };
//   touchMove: {
//     prevTouchY?: number;
//     movingDirection: 'none' | 'down' | 'up';
//   };
//   isContentAreaTouched: boolean;
// }

// export default function useBlogBottomSheet() {
//   const MIN_Y = BOTTOM_SHEET_MIN_Y;
//   const MAX_Y = BOTTOM_SHEET_MAX_Y;

//   const sheet = useRef<HTMLDivElement>(null);
//   const content = useRef<HTMLDivElement>(null);

//   const metrics = useRef<BottomSheetMetrics>({
//     touchStart: {
//       sheetY: 0,
//       touchY: 0,
//     },
//     touchMove: {
//       prevTouchY: 0,
//       movingDirection: 'none',
//     },
//     isContentAreaTouched: false,
//   });

//   useEffect(() => {
//     const handleStart = (e: TouchEvent) => {
//       const { touchStart } = metrics.current;
//       if (sheet.current == null) return;
//       touchStart.sheetY = sheet.current?.getBoundingClientRect().y;
//       touchStart.touchY = e.touches[0].clientY;
//     };

//     const handleTouchMove = (e: TouchEvent) => {
//       const { touchStart, touchMove } = metrics.current;
//       const currentTouch = e.touches[0];

//       // 기본 상태에서 최초 시작
//       if (touchMove.prevTouchY === undefined) {
//         touchMove.prevTouchY = touchStart.touchY;
//       }


//       if (touchMove.prevTouchY === 0) {
//         touchMove.prevTouchY = touchStart.touchY;
//       }

      
//     };
//   }, []);

//   return { sheet, content };
// }
