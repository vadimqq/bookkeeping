<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Сумма</th>
        <th class="th--mobile">Дата</th>
        <th class="th--mobile">Категория</th>
        <th>Тип</th>
        <th>Открыть</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(record, index) in records" :key="record.id">
        <td>{{index + 1}}</td>
        <td class="td--mobile">{{record.amount | currency}}</td>
        <td class="td--mobile">{{record.date | date('datetime')}}</td>
        <td>{{record.categoryName}}</td>
        <td>
          <span class="white-text badge" :class="[record.typeClass]">{{record.typeText}}</span>
        </td>
        <td>
          <button class="btn-small btn" @click="$router.push('/detail-record/'+ record.id)">
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'HistoryTable',
  props: {
    records: {
      required: true,
      type: Array
    }
  }
}
</script>
