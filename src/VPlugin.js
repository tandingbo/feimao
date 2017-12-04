import api from './api'

export default {
  install(Vue){

    Vue.prototype.$post = api.post;
    Vue.prototype.$get = api.get;

    Vue.mixin({
      created(){
        setVue(this)
      }
    });

    Vue.directive('back', function (el, binding) {
      el.onclick = function () {
        history.go(-1);
      }
    })

    Vue.directive('href', function (el, binding) {
      const value = binding.value;
      if(value) {
        switch (typeof value) {
          case 'string':
            el.onclick = function (e) {
              if (binding.modifiers.stop) {
                e.stopPropagation();
                if (el == e.target) {
                  openPage(value);
                }
              } else {
                openPage(value);
              }
            };
            break;
          case 'object':
            el.onclick = function (e) {
              if (binding.modifiers.stop) {
                e.stopPropagation();
                if (el == e.target) {
                  openPage(value[0], value[1]);
                }
              } else {
                openPage(value[0], value[1]);
              }
            };
            break;
        }
      }
    });

    // 1970-01-01 20:00
    Vue.filter('time', function (timestamp) {
      const date = new Date(Number(timestamp) * 1000);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hour = date.getHours();
      const minute = date.getMinutes();
      // const second = date.getSeconds();

      // const time = [hour, minute, second].map(formatNumber).join(':')
      const time = [hour, minute].map(formatNumber).join(':');

      // return date.toDateString() === new Date().toDateString()
      //   ? '今天' + ' ' + time
      //   : [year, month, day].map(formatNumber).join('-') + ' ' + time
      return [year, month, day].map(formatNumber).join('-') + ' ' + time
    });

    Vue.filter('time_2', function (timestamp) {
      const date = new Date(Number(timestamp) * 1000);
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hour = date.getHours();
      const minute = date.getMinutes();

      const time = [hour, minute].map(formatNumber).join(':');
      return [month, day].map(formatNumber).join('-') + ' ' + time
    });

    Vue.filter('avatar', function (value) {
      return value || './static/img/default_head.png';
    });
  }
}
