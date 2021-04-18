<script>
export default {
  props: {
    params: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      limit: 0,
      unit: '',
      allow: '',
      allowType: [],
      lists: {
        mimeType: {
          gif: 'image/gif',
          jpg: 'image/jpeg',
          png: 'image/png',
          text: 'text/plain',
          tsv: 'text/tab-separated-values',
          csv: ['application/vnd.ms-excel', 'text/csv'],
          pdf: 'application/pdf',
        },
        unit: {
          kb: 1000,
          mb: 1000000,
        },
      },
    };
  },

  mounted() {
    this.limit = parseInt(this.params.limit);
    this.unit = this.params.unit;
    this.allow = this.params.allow.split(',');
    this.allowType = this._getAllowMimeType(this.allow);
  },

  methods: {
    isAllowFileType(type) {
      return this.allowType.indexOf(type) !== -1;
    },
    isAllowFileSize(size) {
      return parseInt(size) < this._getLimitSizeByte();
    },
    isImage(type) {
      return type.indexOf('image') !== -1;
    },
    getErrorMessageSize() {
      return this.limit + this.unit + '未満のファイルのみアップロード可能です';
    },
    getErrorMessageType() {
      return this.allow.join('/') + ' ファイルのみアップロード可能です';
    },
    _getAllowMimeType(allow) {
      let mimeTypes = [];
      for (let i = 0; i < allow.length; i++) {
        let target = this.lists.mimeType[allow[i]];
        if (typeof target === 'string') {
          mimeTypes.push(target);
        } else if (target instanceof Array) {
          mimeTypes = mimeTypes.concat(target);
        }
      }
      return mimeTypes;
    },
    _getLimitSizeByte() {
      return this.limit * this.lists.unit[this.unit];
    },
  },
};
</script>
