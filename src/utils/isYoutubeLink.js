function isYoutubeVideo(youtubeLink) {
  const isValid = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  return !!(youtubeLink.match(isValid));
}

export { isYoutubeVideo };
