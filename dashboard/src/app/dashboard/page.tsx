import * as React from 'react';
import type { Metadata } from 'next';
import Grid from '@mui/material/Unstable_Grid2';
import dayjs from 'dayjs';

import { config } from '@/config';
import { Budget } from '@/components/dashboard/overview/budget';
import { LatestOrders } from '@/components/dashboard/overview/latest-orders';
import { LatestProducts } from '@/components/dashboard/overview/latest-products';
import { Sales } from '@/components/dashboard/overview/sales';
import { Traffic } from '@/components/dashboard/overview/traffic';
import { Pharmacies } from '@/components/dashboard/overview/pharmacies';
import { TotalUsers } from '@/components/dashboard/overview/total-users';
import { TotalApplications } from '@/components/dashboard/overview/total-applications';
import { TotalOrders } from '@/components/dashboard/overview/total-orders';
import { Medicine } from '@/components/dashboard/overview/medicine';
import { TotalPrescriptions } from '@/components/dashboard/overview/total-prescriptions';
import { TotalTransactions } from '@/components/dashboard/overview/total-txns';
import backendClient from '@/services/backend-client';
import { User, UserRoles } from '@/types/user.type';
import { cookies } from 'next/headers';
import { TotalCustomers } from '@/components/dashboard/overview/total-customers';

export const metadata = { title: `Overview | Dashboard | ${config.site.name}` } satisfies Metadata;

export default async function Page(): Promise<React.JSX.Element> {


let userObject = cookies().get("custom-auth-user");

let user: User | null = null;

if (userObject?.value) {
  try {
    user = JSON.parse(userObject.value as string) as User;
  } catch (error) {
    user = null;
  }
} else {
  user = null;
}

let response;

if (user) {
  if (user.role == UserRoles.admin) {
    response = await backendClient('GET', 'dashboard/admin');
  } else if (user.role == UserRoles.pharmacy) {
    response = await backendClient('GET', 'dashboard/pharmacy');
  } else {
    response = null;
  }
} else {
  response = null;
}

let data = response?.data;


  return (
    <Grid container spacing={3}>
      <Grid lg={3} sm={6} xs={12}>
        <TotalUsers diff={16} trend="down" sx={{ height: '100%' }} value={data.users} />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TotalCustomers diff={16} trend="down" sx={{ height: '100%' }} value={data.customers} />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <Pharmacies diff={12} trend="up" sx={{ height: '100%' }} value={data.approvedPharmacies} />
      </Grid>

      <Grid lg={3} sm={6} xs={12}>
        <TotalApplications sx={{ height: '100%' }} value={data.applications} />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TotalOrders sx={{ height: '100%' }} value={data.orders} />
      </Grid>

      <Grid lg={3} sm={6} xs={12}>
        <TotalTransactions sx={{ height: '100%' }} value={data.transactions} />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <Medicine diff={12} trend="up" sx={{ height: '100%' }} value={data.medicines} />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TotalPrescriptions diff={16} trend="down" sx={{ height: '100%' }} value={data.prescriptions} />
      </Grid>
      <Grid lg={8} xs={12}>
        <Sales
          chartSeries={[
            { name: 'This year', data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20] },
            { name: 'Last year', data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13] },
          ]}
          sx={{ height: '100%' }}
        />
      </Grid>
      <Grid lg={4} md={6} xs={12}>
        <Traffic chartSeries={[63, 15, 22]} labels={['Desktop', 'Tablet', 'Phone']} sx={{ height: '100%' }} />
      </Grid>
      <Grid lg={4} md={6} xs={12}>
        <LatestProducts
          products={[
            {
              id: 'PRD-005',
              name: 'Soja & Co. Eucalyptus',
              image: '/assets/product-5.png',
              updatedAt: dayjs().subtract(18, 'minutes').subtract(5, 'hour').toDate(),
            },
            {
              id: 'PRD-004',
              name: 'Necessaire Body Lotion',
              image: '/assets/product-4.png',
              updatedAt: dayjs().subtract(41, 'minutes').subtract(3, 'hour').toDate(),
            },
            {
              id: 'PRD-003',
              name: 'Ritual of Sakura',
              image: '/assets/product-3.png',
              updatedAt: dayjs().subtract(5, 'minutes').subtract(3, 'hour').toDate(),
            },
            {
              id: 'PRD-002',
              name: 'Lancome Rouge',
              image: '/assets/product-2.png',
              updatedAt: dayjs().subtract(23, 'minutes').subtract(2, 'hour').toDate(),
            },
            {
              id: 'PRD-001',
              name: 'Erbology Aloe Vera',
              image: '/assets/product-1.png',
              updatedAt: dayjs().subtract(10, 'minutes').toDate(),
            },
          ]}
          sx={{ height: '100%' }}
        />
      </Grid>
      <Grid lg={8} md={12} xs={12}>
        <LatestOrders
          orders={[
            {
              id: 'ORD-007',
              customer: { name: 'Ekaterina Tankova' },
              amount: 30.5,
              status: 'pending',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
            {
              id: 'ORD-006',
              customer: { name: 'Cao Yu' },
              amount: 25.1,
              status: 'delivered',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
            {
              id: 'ORD-004',
              customer: { name: 'Alexa Richardson' },
              amount: 10.99,
              status: 'refunded',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
            {
              id: 'ORD-003',
              customer: { name: 'Anje Keizer' },
              amount: 96.43,
              status: 'pending',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
            {
              id: 'ORD-002',
              customer: { name: 'Clarke Gillebert' },
              amount: 32.54,
              status: 'delivered',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
            {
              id: 'ORD-001',
              customer: { name: 'Adam Denisov' },
              amount: 16.76,
              status: 'delivered',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
          ]}
          sx={{ height: '100%' }}
        />
      </Grid>
    </Grid>
  );
}
