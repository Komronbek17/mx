import { reactive, toRefs } from "vue";

export function loadingComposable() {
  const state = reactive({
    loading: false,
  });

  function startLoading() {
    state.loading = true;
  }

  function finishLoading() {
    state.loading = false;
  }

  // const startLoading = () => {
  //   state.loading = true;
  // };
  //
  // const finishLoading = () => {
  //   state.loading = false;
  // };

  return {
    ...toRefs(state),
    startLoading,
    finishLoading,
  };
}
