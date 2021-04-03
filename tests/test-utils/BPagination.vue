<template>
  <div>
    <ul
      role="menubar"
      aria-disabled="false"
      aria-label="Pagination"
      class="pagination b-pagination justify-content-center">
      <li role="presentation" aria-hidden="true" class="page-item disabled">
        <span role="menuitem" aria-label="Go to first page" aria-disabled="true" class="page-link"></span>
      </li>
      <li role="presentation" aria-hidden="true" class="page-item disabled">
        <span role="menuitem" aria-label="Go to previous page" aria-disabled="true" class="page-link">Prev</span>
      </li>
      <li role="presentation" class="page-item active">
        <button role="menuitemradio" type="button" aria-label="Go to page 1" aria-checked="true" aria-posinset="1" aria-setsize="81" tabindex="0" class="page-link">1</button>
      </li>
      <li role="presentation" class="page-item">
        <button role="menuitemradio" type="button" aria-label="Go to page 2" aria-checked="false" aria-posinset="2" aria-setsize="81" tabindex="-1" class="page-link">2</button>
      </li>
      <li role="presentation" class="page-item">
        <button role="menuitemradio" type="button" aria-label="Go to page 3" aria-checked="false" aria-posinset="3" aria-setsize="81" tabindex="-1" class="page-link">3</button>
      </li>
      <li role="presentation" class="page-item bv-d-xs-down-none">
        <button role="menuitemradio" type="button" aria-label="Go to page 4" aria-checked="false" aria-posinset="4" aria-setsize="81" tabindex="-1" class="page-link">4</button>
      </li>
      <li role="separator" class="page-item disabled bv-d-xs-down-none">
        <span class="page-link">…</span>
      </li>
      <li role="presentation" class="page-item">
        <button role="menuitem" type="button" tabindex="-1" aria-label="Go to next page" class="page-link">Next</button>
      </li>
      <li role="presentation" class="page-item">
        <button role="menuitem" type="button" tabindex="-1" aria-label="Go to last page" class="page-link">»</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {}
</script>