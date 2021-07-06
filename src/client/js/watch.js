const postingFile = document.querySelector("#postingFile");
const handleView = async () => {
    const id = postingFile.dataset.id;
    await fetch(`/api/posts/${id}/addView`, {
        method: "POST",
    });
}

if (postingFile.nodeName === "IMG") {
    postingFile.addEventListener("load", handleView);
} else {
    postingFile.addEventListener("loadedmetadata", handleView);
}