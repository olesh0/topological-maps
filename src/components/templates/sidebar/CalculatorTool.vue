<template>
  <Modal :show="show">
    <h2>Calculator tool</h2>

    <div class="sections">
      <div
        v-for="(section, sectionIndex) in sections"
        v-bind:key="section.name"
        @click="selectedSection = sectionIndex"
        :class="{ selected: sectionIndex === selectedSection }"
        class="section"
      >
        {{section.name}}
      </div>
    </div>

    <div
      class="selected-section"
      v-if="selectedSectionInfo"
    >
      <h3>{{selectedSectionInfo.name}}</h3>

      <div class="input-fields">
        <div
          v-for="(inputField) in selectedSectionInfo.fields"
          v-bind:key="inputField.name"
          class="field"
        >
          <div class="input-label">
            {{inputField.label}}
          </div>

          <input
            type="number"
            :name="inputField[inputField.name]"
            v-model="inputFields[inputField.name]"
          />
        </div>

        <div class="field">
          <button
            type="button"
            name="button"
            @click="selectedSectionInfo.handler(inputFields)"
          >
            Calculate
          </button>
        </div>
      </div>

      <div
        v-if="data"
        class="data-list"
      >
        <div
          v-for="([label, value]) in Object.entries(data)"
          v-bind:key="label"
          class="data-item"
        >
          <span>{{label}}</span>
          <span>{{value}}</span>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script>
import _ from 'lodash'
import Modal from '@/components/ui/Modal.vue'

const ONE_FEET_IN_METER = 0.3048

export default {
  computed: {
    selectedSectionInfo() {
      const selected = _.get(this.sections, `[${this.selectedSection}]`, null)

      return selected
    },
  },
  data() {
    return {
      selectedSection: null,
      inputFields: {},
      data: {},
      sections: [
        {
          name: 'Angle of elevaltion',
          handler: (data) => {
            const objectHeight = parseInt(_.get(data, 'objectHeight', 0), 10)
            const objectDistance = parseInt(_.get(data, 'objectDistance', 0), 10)

            const elevationRadians = Math.atan(objectHeight / objectDistance)
            const elevation = elevationRadians * (180 / Math.PI)

            this.data = {
              Elevation: `${elevation}°`,
              'Distance to the object (m)': `${(objectDistance * ONE_FEET_IN_METER).toFixed(2)}m`,
              'Height of the object (m)': `${(objectHeight * ONE_FEET_IN_METER).toFixed(2)}m`,
            }
          },
          fields: [
            {
              // type: 'NUMBER',
              name: 'objectHeight',
              label: 'Height of the object (ft)',
            },
            {
              // type: 'NUMBER',
              name: 'objectDistance',
              label: 'Distance to the object (ft)',
            },
          ],
        },
        { name: 'Elevation' },
        { name: 'Distance' },
      ],
    }
  },
  components: {
    Modal,
  },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
}
</script>

<style lang="less" scoped>
h2 {
  margin: 0;
  padding: 20px;
}

h3 {
  margin: 0;
}

.sections {
  margin: 0 20px 10px;
  user-select: none;

  .section {
    display: inline-block;
    padding: 7px 10px;
    background: var(--color-bg-dark);
    margin-right: 10px;
    cursor: pointer;

    &.selected {
      background: var(--color-accent-green);
    }
  }
}

.selected-section {
  padding: 20px;
}

.input-fields {
  margin: 10px 0;

  .field {
    display: inline-block;
    margin-right: 10px;

    .input-label {
      margin-bottom: 3px;
      color: var(--color-font-light);
    }

    input {
      background: var(--color-bg-dark);
      color: var(--color-font-main);
      border: 0;
      padding: 7px 10px;

      &:placeholder {
        color: var(--color-font-dark);
      }
    }

    button {
      border: 0;
      background: var(--color-accent-blue);
      color: var(--color-font-main);
      cursor: pointer;
      padding: 7px 10px;
    }
  }
}

.data-list {
  margin: 20px 0;

  .data-item {
    span {
      display: inline-block;
      width: 200px;
    }

    span:first-child {
      color: var(--color-font-dark);
    }

    span:last-child {
      color: var(--color-accent-green);
      margin-left: 10px;
    }
  }
}
</style>
