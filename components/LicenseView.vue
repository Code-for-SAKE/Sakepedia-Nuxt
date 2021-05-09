<template>
  <div v-if="value === 'CC0'">
    <p xmlns:dct="http://purl.org/dc/terms/">
      <a rel="license" href="http://creativecommons.org/publicdomain/zero/1.0/">
        <img
          src="http://i.creativecommons.org/p/zero/1.0/88x31.png"
          style="border-style: none"
          alt="CC0"
        />
      </a>
      <br />
      法律の下で可能な範囲で、この作品のすべての著作権および関連する権利または隣接権が放棄されました。
    </p>
  </div>
  　
  <div v-else-if="value === 'PD'">
    <p xmlns:dct="http://purl.org/dc/terms/">
      <a rel="license" href="http://creativecommons.org/publicdomain/mark/1.0/">
        <img
          src="http://i.creativecommons.org/p/mark/1.0/88x31.png"
          style="border-style: none"
          alt="Public Domain Mark"
        />
      </a>
      <br />
      この作品は著作権法上の制約が知られている限り存在していません。
    </p>
  </div>
  　
  <div v-else-if="value === 'CC-BY'">
    <p xmlns:dct="http://purl.org/dc/terms/">
      <a rel="license" href="http://creativecommons.org/licenses/by/4.0/"
        ><img
          alt="クリエイティブ・コモンズ・ライセンス"
          style="border-width: 0"
          src="https://i.creativecommons.org/l/by/4.0/88x31.png" /></a
      ><br />この 作品 は
      <a rel="license" href="http://creativecommons.org/licenses/by/4.0/"
        >クリエイティブ・コモンズ 表示 4.0 国際 ライセンス</a
      >の下に提供されています。
    </p>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
  },
};
</script>
