import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {getToken} from '@/utils/auth'
NProgress.configure({showSpinner: false})

const whiteList = ['/admin/login']
router.beforeEach(async(to, from, next) => {
    NProgress.start()
    // document.title = getPageTitle(to.meta.title)
    const hasToken = getToken();
    if(hasToken){
        if(to.path === '/admin/login'){
            next({path: '/'})
            NProgress.done()
        }else{
            next();
            NProgress.done()
        }
    } else{
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            if(to.path.indexOf('/admin') !== -1){
                next(`/admin/login?redirect=${to.path}`)
            }else{
                next();
            }
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done();
})