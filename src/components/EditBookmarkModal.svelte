<script lang="ts">
  import { Tag, type Links } from "$lib/interfaces";
  import { bookmarks, editFormMetadata } from "$lib/store";
  import { createJsonData, updateBookmark } from "$lib/utils";

  export let renderEditModalToggle: () => void;
  const handleEditSubmit = (e: Event) => {
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const newLinkRaw = String(formData.get("link"));
    const newIcon = String(formData.get("icon"));
    const newTitle = String(formData.get("title"));
    const newTagRaw = String(formData.get("tag"));
    const newTag: () => Tag = () => {
      if (newTagRaw in Tag) {
        return Tag[newTagRaw as keyof typeof Tag];
      } else {
        return Tag.com;
      }
    };

    const newId = Number(formData.get("id"));
    const newLink: Links = {
      id: newId,
      title: newTitle,
      link: newLinkRaw,
      icon: newIcon,
      tag: newTag(),
    };
    $bookmarks = updateBookmark(newLink);
    createJsonData($bookmarks);
    renderEditModalToggle();
  };
</script>

<form on:submit|preventDefault={handleEditSubmit} class="modal__form">
  <h1 class="title">Edit</h1>
  <input type="text" name="id" value={$editFormMetadata.id} hidden />
  <input
    type="text"
    name="tag"
    value={$editFormMetadata.tag.toString()}
    hidden
  />
  <input type="text" name="title" value={$editFormMetadata.title} />
  <input type="text" name="icon" value={$editFormMetadata.icon} />
  <div class="icon__description">
    <span
      >choose an icon from
      <a href="https://www.nerdfonts.com/cheat-sheet">nerdfonts</a>
    </span>
  </div>

  <input type="text" name="link" value={$editFormMetadata.link} />
  <div class="modal__button__wrapper">
    <button type="submit"> Send </button>
    <button type="button" on:click={renderEditModalToggle}> cancel </button>
  </div>
</form>
