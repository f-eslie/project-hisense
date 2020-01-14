

import 'jquery';
import {
    swiper
} from './banner.js';
import {
    render
} from './render.js';
import {
    louti
} from './louti.js';
import {
    topHover
} from './top_hover.js';
import {
    topRender
} from './topRender.js';
import {
    bottomRender
} from './bottomRender';
import {
    detailsRender
} from './detailsRender.js';
import {
    fdj
} from './fdj.js';
import {
    storage
} from './localstorage.js';

let currentPage = $('#current').attr('page');
if (currentPage === 'index') {
    // 轮播图
    swiper();
    // 渲染数据
    render();
    // 楼梯
    louti();
    // 顶部悬浮
    topHover();

} else if (currentPage === 'details') {
    // 加载头部
    topRender();
    // 加载底部
    bottomRender();
    // 渲染数据
    new detailsRender().init();
    // 放大镜
    fdj();
    // 本地存储
    storage();
}
