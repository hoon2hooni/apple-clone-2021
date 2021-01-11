
(()=>{
    const sceneInfo = [
        { 
            type: "sticky",
            heightNum: 5, //브라우저 높이의 5배로 sccrollHeight 세팅  디바이스 마다 다르기에 이렇게 해줌
            scrollHeight: 0, // 스크롤높이 스크롤의 몇배수
            objs: {
                container: document.querySelector('#scroll-section-0')
            },
        },
        {
            type:"normal",
            heightNum: 5, 
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-1')
            },
        },
        {
            type:"sticky",
            heightNum: 5, 
            scrollHeight: 0, 
            objs: {
                container: document.querySelector('#scroll-section-2')
            },
        },
        {
            type:"sticky",
            heightNum: 5, 
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-3')
            },
        }
        
    ];
    function setLayout(){
        // 각 스크롤 섹션의 높이 세팅
        for (let i =0; i < sceneInfo.length; i++){
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
        }

    }

})
// (function() {})();
// 전역변수 말고 지역변수 사용하기 위해 함수에 넣어줌
