export function useInfiniteScroll({ fn, el }) {
  function mountInfiniteScroll({ reverse = false } = { reverse: false }) {
    const listElm = document.getElementById(el);

    if (!listElm) {
      return;
    }

    function scrollHandler(e) {
      e.preventDefault();
      if (reverse) {
        if (listElm.scrollTop < 1) {
          loadMore({ reverse: true });
        }
      } else {
        if (listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
          loadMore({});
        }
      }
    }

    listElm.addEventListener("scroll", scrollHandler);
  }

  function loadMore({ reverse = false }) {
    const listElm = document.getElementById(el);
    const pHeight = listElm.scrollHeight;
    setTimeout(() => {
      fn().then(() => {
        if (reverse) {
          const nHeight = listElm.scrollHeight;
          listElm.scrollTo(0, nHeight - pHeight);
        }
      });
    }, 500);
  }

  return {
    mountInfiniteScroll,
  };
}
