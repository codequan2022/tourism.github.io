

// 获取所有视频元素
const videos = document.querySelectorAll('iframe');

// 判断元素是否在可视区域内的函数
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// 控制视频播放与暂停的函数
function handleVideoState() {
  videos.forEach(video => {
    if (isElementInViewport(video)) {
      if (video.paused) {
        video.play();
      }
    } else {
      video.pause();
    }
  });
}

// 初始加载时检查一次视频状态
handleVideoState();

// 滚动事件监听，实时检查视频状态
window.addEventListener('scroll', handleVideoState);

// 窗口大小变化时重新检查视频状态
window.addEventListener('resize', handleVideoState);


document.addEventListener('DOMContentLoaded', function() {
    const scrollLeftButton = document.querySelector('.scroll-left');
    const scrollRightButton = document.querySelector('.scroll-right');
    const notesContainer = document.querySelector('.notes-container');

    scrollLeftButton.addEventListener('click', function() {
        notesContainer.scrollBy({
            left: -(1105),
            behavior: 'smooth'
        });

        // 循环滚动
        if (notesContainer.scrollLeft === 0) {
            notesContainer.scrollBy({
                left: notesContainer.scrollWidth, // 滚动到最后一条笔记
                behavior: 'smooth'
            });
        }
    });

    scrollRightButton.addEventListener('click', function() {
        notesContainer.scrollBy({
            left: 1105,
            behavior: 'smooth'
        });

        // 循环滚动
        if (notesContainer.scrollLeft + notesContainer.clientWidth >= notesContainer.scrollWidth) {
            notesContainer.scrollBy({
                left: -notesContainer.scrollWidth, // 滚动到第一条笔记
                behavior: 'smooth'
            });
        }
    });
});




document.addEventListener("DOMContentLoaded", function() {
    const sidebar = document.querySelector(".sidebar");
    const sidebarLinks = sidebar.querySelectorAll("a");

    sidebarLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault(); // 阻止默认跳转行为
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop;
                window.scrollTo({
                    top: offsetTop,
                    behavior: "smooth"
                });
            }
        });
    });

    const topLink = document.querySelector('a[href="#top"]');
    topLink.addEventListener("click", function(event) {
        event.preventDefault(); // 阻止默认跳转行为
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    window.addEventListener("scroll", function() {
        if (window.scrollY > window.innerHeight * 1/4) {
            sidebar.style.top = "5vw"; // 滚动超过1/4屏幕高度时显示小导航栏
        } else {
            sidebar.style.top = "-100vw"; // 否则隐藏小导航栏
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    // 平滑滚动功能
    var links = document.querySelectorAll('a[href^="#"]');
    links.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            var targetId = link.getAttribute('href').substring(1);
            var targetElement = document.getElementById(targetId);
            if (targetElement) {
                var offsetTop = targetElement.offsetTop;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 轮播图功能
    const slides = document.querySelector(".carousel .slides");
    const pagination = document.querySelector(".carousel .pagination");
    const slideCount = slides.children.length;
    let currentIndex = 0;

    for (let i = 0; i < slideCount; i++) {
        const dot = document.createElement("div");
        dot.classList.add("pagination-dot");
        if (i === 0) dot.classList.add("active");
        dot.setAttribute("data-index", i);
        pagination.appendChild(dot);
    }

    const dots = pagination.querySelectorAll(".pagination-dot");

    dots.forEach(dot => {
        dot.addEventListener("click", () => {
            const index = parseInt(dot.getAttribute("data-index"));
            currentIndex = index;
            changeSlide();
        });
    });

    const slideInterval = 2500;

    function autoSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        changeSlide();
    }

    let intervalID = setInterval(autoSlide, slideInterval);

    slides.addEventListener("mouseenter", () => {
        clearInterval(intervalID);
    });

    slides.addEventListener("mouseleave", () => {
        intervalID = setInterval(autoSlide, slideInterval);
    });

    function changeSlide() {
        const slideWidth = slides.querySelector(".slide").clientWidth;
        slides.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add("active");
            } else {
                dot.classList.remove("active");
            }
        });
    }
});
