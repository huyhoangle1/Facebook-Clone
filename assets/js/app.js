const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const overplay = $('.overplay')
const itemsHeaderRight = $$('.header-right__item')
const newNotifyList = $('.notify-content__new-list')
const oldNotifyList = $('.notify-content__before-list')

const obj = JSON.parse(localStorage.getItem('obj')) || {}

//close overplay
if (overplay) {
    overplay.onclick = (e) => {
        if (!(e.target.closest('.overplay-body'))) {
            overplay.style.display = 'none'
            document.body.style.overflow = 'auto'
        }
    }
}

//dark mode
const darkBtns = $$('.header-switch__box ')
const appComponent = $('.app')

if (darkBtns && appComponent) {
    darkBtns.forEach(dark => {
        dark.onclick = function() {
            if(this.classList.contains('dark')) {
                this.classList.remove('dark')
                appComponent.classList.remove('dark')
                obj.mode = 'light'
            } else {
                this.classList.add('dark')
                appComponent.classList.add('dark')
                obj.mode = 'dark'
            }
    
            localStorage.setItem('obj', JSON.stringify(obj))
        }
    })
}

//show, hide menu sub header right
if (itemsHeaderRight.length != 0) {
    
    itemsHeaderRight.forEach(item => {
        item.onclick = () => {
            const toggle = $('.nav-left-layout')
            const itemActive = $('.header-right__item.active')
            item.classList.toggle('active')
            if(toggle) {
                const containerLeft = $('.container-left')
                toggle.classList.remove('active')
                if (containerLeft) {
                    containerLeft.classList.remove('active')
                }
            }
            if (itemActive) {
                itemActive.classList.remove('active')
            }
        }
    })

    const titleNewNotify = $('.new-notify__title')

    if (titleNewNotify) {
        //show th??ng b??o
        const notifiesHeader = (() => {
    
            const notifies = [
                {
                    id: 0,
                    path: "./assets/img/Home/avatar-notify-1.jpg",
                    content: `Qu???n tr??? vi??n ???? c???p nh???t ph???n m?? t??? c???a nh??m
                    <span>Gentle ???</span>
                    . `,
                    time: 3,
                    seen: false,
                },
                {
                    id: 1,
                    path: "./assets/img/Home/avatar-notify-2.jpg",
                    content: `<span>L???c Quang Tr???nh</span>
                    v??
                    <span>Nam Tr???n</span>
                    c??ng ???? b??nh lu???n v??? b??i vi???t c???a
                    <span>Qu???c Tr???nh</span>
                    .`,
                    time: 13,
                    seen: false,
                },
                {
                    id: 2,
                    path: "./assets/img/Home/avatar-notify-3.jpg",
                    content: `<span>Qu???c Tr???nh</span>
                    ???? nh???c ?????n b???n trong m???t b??nh lu???n.`,
                    time: 20,
                    seen: false,
                },
                {
                    id: 3,
                    path: "./assets/img/Home/avatar-notify-4.jpg",
                    content: `<span>Titan Gaming</span>
                    c?? 22 l?????t xem m???i.`,
                    time: 23,
                    seen: false,
                },
                {
                    id: 4,
                    path: "./assets/img/Home/avatar-notify-5.jpg",
                    content: `<span>Linh Trang</span>
                    ???? b??nh lu???n v??? m???t ???nh b???n ??ang theo d??i trong
                    <span>Ng??i Sao L???p L??nh Offical</span>
                    .`,
                    time: 30,
                    seen: true,
                },
                {
                    id: 5,
                    path: "./assets/img/Home/avatar-notify-6.jpg",
                    content: `<span>L?? Ph?????c</span>
                    ???? b??nh lu???n v??? tr???ng th??i b???n chia s???.`,
                    time: 45,
                    seen: true,
                },
                {
                    id: 6,
                    path: "./assets/img/Home/avatar-notify-7.jpg",
                    content: `<span>Nguy???n Qu???c Si??u</span>
                    ???? b??nh lu???n v??? li??n k???t b???n chia s???.`,
                    time: 52,
                    seen: true,
                },
            ]
    
            return {
                render(arr, component){
                    const htmls = arr.map((notify, index) => {
                        return `
                        <li data-index="${notify.id}" class="notify-content__item ${notify.seen ? 'seen' : null}">
                            <img src="${notify.path}" alt="" class="notify-content__item-avatar">
                            <div class="notify-content__item-content">
                                <div class="notify-content__item-content-text">
                                    ${notify.content}
                                </div>
                                <p " class="notify-content__item-time">
                                    ${notify.time} ph??t tr?????c
                                </p>
                            </div>
                            <i class="fas fa-circle"></i>
                        </li>
                        `
                    })
                    .join('')
                    component.innerHTML = htmls
                },
                renderNotify(){
                    const titleNewNotify = $('.new-notify__title')
                    const countNotify = $('.header-right__item-count')
                    const newNotifies = notifies.filter(notify => !notify.seen)
                    const oldNotifies = notifies.filter(notify => notify.seen)
                    
                    if (titleNewNotify) {
    
                    }
                    //ki???m tra c?? c??n th??ng b??o m???i hay kh??ng
                    if (newNotifies.length === 0) {
                        titleNewNotify.style.display = 'none'
                        countNotify.style.display = 'none'
                    } else {
                        titleNewNotify.style.display = 'block'
                        countNotify.innerHTML = newNotifies.length
                        countNotify.style.display = 'flex'
                    }
    
                    this.render(newNotifies, newNotifyList)
                    this.render(oldNotifies, oldNotifyList)
    
                },
                handle(){
    
                    //clicked v??o th??ng b??o m???i
                    newNotifyList.onclick = (e) => {
                        const itemNew = e.target.closest('.notify-content__item')
                        if (itemNew) {
                            const id = itemNew.dataset.index
                            notifies[id].seen = true
                            this.renderNotify()
                        }
                    }
    
                    setInterval(() => {
                        notifies.forEach(notify => {
                            notify.time += 1;
                        })
                        this.renderNotify()
                    }, 60000)
                },
                start(){
                    this.renderNotify()
                    this.handle()
                }
            }
        })().start()
    }
}

window.onclick = function(e){

    //t???t submenu khi click ngo??i v??ng
    if (itemsHeaderRight.length != 0) {
        const menuSub = e.target.closest('.header-right__item') || e.target.closest('.header-right__item-more')
        if(!menuSub) {
            itemsHeaderRight.forEach(item => {
                item.classList.remove('active')
            })
        }
    }

    //v???n l?? sub menu nh??ng l?? c???a newfeed :v
    if ($('.newsfeed__info-setting-list')) {
        if (!(e.target.closest('.newsfeed__info-setting-list.active')) 
        && !(e.target.closest('.newsfeed__info-setting.more-dots'))) {
            $$('.newsfeed__info-setting-list.active').forEach(item => {
                item.classList.remove('active')
            })
        }
    }
}

// storage
const F = (() => {
    const users = [
        {
            id: 0,
            firstName: "Th??ng",
            lastName: "Fly",
            fullName: "Th??ng Fly",
            phone: "0123123123",
            password: "123",
            avatar: "./assets/img/Home/thangfly.jpg",
            bg: "./assets/img/Home/thangfly-bg.jpg",
            postLiked: ["1", "2"],
            cmtLiked: ["0"],
            isLogin: false,
            onl: 0,
        },
        {
            id: 1,
            firstName: "",
            lastName: "FAP TV",
            fullName: "FAP TV",
            phone: "0123123124",
            password: "123",
            avatar: "./assets/img/Home/faptv.jpg",
            postLiked: ["0"],
            cmtLiked: ["1"],
            isLogin: false,
            onl: 0,
        }
    ]

    const newfeeds = [
        {
            id: 0,
            idUser: 0,
            time: 1,
            bg: "./assets/img/Home/thangfly-bg.jpg",
            content: "?????i ng?????i ng???n l???m ...",
            like: 6800,
            cmt: 55,
            share: 121,
            deleted: false,
        },
        {
            id: 1,
            idUser: 1,
            time: 4,
            bg: "./assets/img/Home/faptv-bg.jpg",
            content: "Th???i ??i h???c ai m?? kh??ng c?? m???i t??nh ?????u ph???i kh??ng?",
            like: 2300,
            cmt: 52,
            share: 82,
            deleted: false,
        },
        {
            id: 2,
            idUser: 1,
            time: 7,
            bg: "./assets/img/Home/meow-bg.jpg",
            content: "D???o n??y b??? chai pin r???i n??n s???c m???y ti???ng ch??a ?????y ???? N??o ?????y pin th?? kiu Tr???m d???y nha Sen ????.",
            like: 1200,
            cmt: 42,
            share: 21,
            deleted: false,
        },
    ]

    const comments = [
        {
            id: 0,
            idUser: 0,
            idPost: 1,
            content: "Th???t l?? d??? th????ng!",
            like: 252,
            sub: false,
            deleted: false,
        },
        {
            id: 1,
            idUser: 1,
            idPost: 1,
            content: "Th???t l?? d??? th????ng 2!",
            like: 134,
            sub: false,
            deleted: false,
        },
        {
            id: 2,
            idUser: 1,
            idPost: 0,
            content: "Th???t l?? d??? th????ng 3! Mong m???i ??i???u t???t ?????p s??? ?????n v???i b???n s???m nh???t c?? th???. C???m ??n v?? t???t c??? :3",
            like: 152,
            sub: false,
            deleted: false,
        },
        {
            id: 3,
            idUser: 0,
            idPost: 1,
            content: "C???m ??n r???t nhi???u!",
            like: 12,
            sub: true,
            deleted: false,
            parentIdCmt: 1,
        },
        {
            id: 4,
            idUser: 1,
            idPost: 1,
            content: "C???m ??n r???t nhi???u 2!",
            like: 11,
            sub: true,
            deleted: false,
            parentIdCmt: 0,
        },
    ]

    const obj = {
        mode: "light",
    }

    const messengers = [
        {
            id: 0,
            idUser: 0,
            Author: true,
            content: "????y l?? tin nh???n 1",
            deleted: false,
            isReact: true,
            endMess: false,
        },
        {
            id: 1,
            idUser: 0,
            Author: false,
            content: "????y l?? tin nh???n 2",
            deleted: false,
            isReact: false,
            endMess: true,
        },
        {
            id: 2,
            idUser: 1,
            Author: true,
            content: "????y l?? tin nh???n 3",
            deleted: false,
            isReact: true,
            endMess: false,
        },
        {
            id: 3,
            idUser: 1,
            Author: false,
            content: "????y l?? tin nh???n 4",
            deleted: false,
            isReact: false,
            endMess: true,
        },
        {
            id: 4,
            idUser: 2,
            Author: false,
            content: "????y l?? tin nh???n 5",
            deleted: false,
            isReact: true,
            endMess: false,
        },
        {
            id: 5,
            idUser: 2,
            Author: true,
            content: "????y l?? tin nh???n 6",
            deleted: false,
            isReact: true,
            endMess: true,
        }
    ]

    return {

        setStorage(){
            localStorage.getItem('users') ? null :
            localStorage.setItem('users', JSON.stringify(users))

            localStorage.getItem('newfeeds') ? null :
            localStorage.setItem('newfeeds', JSON.stringify(newfeeds))

            localStorage.getItem('comments') ? null :
            localStorage.setItem('comments', JSON.stringify(comments))

            localStorage.getItem('obj') ? null :
            localStorage.setItem('obj', JSON.stringify(obj))

            localStorage.getItem('messengers') ? null :
            localStorage.setItem('messengers', JSON.stringify(messengers))
        }
    }
})().setStorage()





