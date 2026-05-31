<script setup lang="ts">
import SectionTitle
from '@/components/ui/SectionTitle.vue'

import WalletsOverviewCard
from '@/components/wallets/WalletsOverviewCard.vue'

import WalletBalancesCard
from '@/components/wallets/WalletBalancesCard.vue'

import WalletTransactionsCard
from '@/components/wallets/WalletTransactionsCard.vue'

import SystemStatusCard
from '@/components/system/SystemStatusCard.vue'
</script>

<template>
  <div
    class="
      space-y-8
    "
  >
    <SectionTitle
      title="Wallets"
      subtitle="Capital Management"
    />

    <WalletsOverviewCard />

    <WalletBalancesCard />

    <WalletTransactionsCard />
  </div>
</template>