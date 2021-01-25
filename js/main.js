
(()=>{
    let yOffset = 0; //쓸 변수 들 선언
    let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)
    let currentScene = 0; // 현재 활성화된(눈 앞에 보고 있는 씬 , scroll- section) 
    let enterNewScene = false;
    const sceneInfo = [
        {   
            //o
            type: "sticky",
            heightNum: 5, //브라우저 높이의 5배로 sccrollHeight 세팅  디바이스 마다 다르기에 이렇게 해줌
            scrollHeight: 0, // 스크롤높이 스크롤의 몇배수
            objs: {
                container: document.querySelector('#scroll-section-0'),
                messageA: document.querySelector("#scroll-section-0 .main-message.a"),
                messageB: document.querySelector("#scroll-section-0 .main-message.b"),
                messageC: document.querySelector("#scroll-section-0 .main-message.c"),
                messageD: document.querySelector("#scroll-section-0 .main-message.d")
            },
            values: {
                messageA_opacity: [0, 1, { start: 0.1, end: 0.2 }],  //10퍼센트에서 20퍼센트 스크롤의 비율
                messageB_opacity: [0, 1, { start: 0.3, end: 0.4 }], //30퍼센트에서 40퍼센트
            }
        },

        {  
            //1
            type:"normal",
            heightNum: 5, 
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-1')
            }
        },
        {   
            //2
            type:"sticky",
            heightNum: 5, 
            scrollHeight: 0, 
            objs: {
                container: document.querySelector('#scroll-section-2')
            }
        },
        {   
            //3
            type:"sticky",
            heightNum: 5, 
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-3')
            }
        }
        
    ];
    console.log(sceneInfo[1].scrollHeight);
    function setLayout( ){
        // 각 스크롤 섹션의 높이 세팅
        for  (let i =0; i < sceneInfo.length; i++){
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
        }

        let yOffset = window.pageYOffset;
        let totalScrollHeight  = 0; //현재 창 새로고침 했을때 current scene 지정
        for (let i = 0; i  < sceneInfo.length; i++) { // 현재 스크롤 위치랑 totalscrollheigh 비교
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if (totalScrollHeight >= yOffset){ // 만약 total scrollHeight 가 현재 스크롤 위치보다 커지면 break 하고 i값을 current로 넣어줌
                currentScene = i;
                break; 
            }
        }
    }
    function calcValues(currentValues, currentYOffset){
        let rv = currentYOffset; 
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio =currentYOffset / scrollHeight;
        
        if (currentValues.length === 3 ){
            //start ~end 사이에 애니메션 실행
            const partScrollStart = currentValues[2].start * scrollHeight;
            const partScrollEnd = currentValues[2].end *  scrollHeight;
            const partScrollHeight = partScrollEnd - partScrollStart;

            if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd){
                rv = (currentYOffset - partScrollStart)/partScrollHeight * (currentValues[1] - currentValues[0]) + currentValues[0];    
            }else if (currentYOffset < partScrollStart){
                rv = currentValues[0];
            } else if (currentYOffset > partScrollEnd) {
                rv = currentValues[1];
            }
        } else{
            rv = scrollRatio * (currentValues[1]- currentValues[0])+ currentValues[0]; // 현재 씬의 처음부터 끝가지 진행 되는것 근데 이제 분기 처리를 해줘야됨
        }
        return rv;
    }
    function playAnimation( )  {
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        const currentYOffset = yOffset - prevScrollHeight;
        console.log(currentScene);
        switch (currentScene) { 
            case 0:
                let messageA_opacity_in = calcValues(values.messageA_opacity, currentYOffset);
                objs.messageA.style.opacity = messageA_opacity_in;
                console.log(messageA_opacity_in);
                break;
            case 1:
                console.log('1 play');
                break;
            case 2:
                console.log('2 play');
                break;
            case 3:
                console.log('3 play');
                break;
        }
    }
    function scrollLoop( ){
        enterNewScene = true;
        prevScrollHeight = 0;
        for  (let i =0; i < currentScene; i++){
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }
        if  (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight){
            enterNewScene = true;
            currentScene ++ ;
            document.body.setAttribute("id", `show-scene-${currentScene}`);
            //나중에 다시 수정해야 할 부분 
        }
        if (yOffset < prevScrollHeight){
            enterNewScene = true;
            if (currentScene ===0) return;
            currentScene --;
            document.body.setAttribute("id", `show-scene-${currentScene}`);
        }
        if  (enterNewScene) return;
        playAnimation( );
        // document.body.setAttribute("id", `show-scene-${currentScene}`);
        //  내려갈때 yOffset  >  prevScrollHeight + section -> currentScent  += 1 
        //  올라갈때  yOffset  < prevScrollHeight - > currentScene  -= 1
        // 메뉴떄매  딱맞아 덜어지지 않음

    
    }

    window.addEventListener("resize", setLayout());
    window.addEventListener("scroll", () => {
        yOffset  = window.pageYOffset;
        // console.log(yOffset)
        scrollLoop( );
        playAnimation( );
    });
    // window.addEventListener("DOMContentLoaded", setLayout);
    window.addEventListener("load", setLayout);
    window.addEventListener("resize", setLayout);
    // setLayout();
    // 문서가 다 완전히  로드되면 
}) ( );
// (function() {})();
// 전역변수 말고 지역변수 사용하기 위해 함수에 넣어줌