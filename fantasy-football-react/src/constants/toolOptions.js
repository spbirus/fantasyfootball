import React from 'react';
import {
  PeopleRounded,
  ShowChartRounded,
  MultilineChartRounded,
  CompareArrowsRounded,
  DashboardRounded,
} from '@material-ui/icons';
import {
  DEPTH_ROUTE,
  ROSTER_ROUTE,
  POWER_RANKING_ROUTE,
  PLAYER_COMPARISON_ROUTE,
  DASHBOARD_ROUTE,
} from './routes';

export const toolOptions = [
  {
    name: 'Dashboard',
    route: DASHBOARD_ROUTE,
    icon: <DashboardRounded />,
    description: 'Dashboard page that holds all the tools available for Fantasy Sports.',
    image:
      'https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
  },
  {
    name: 'Depth Chart',
    route: DEPTH_ROUTE,
    icon: <PeopleRounded />,
    description: 'List of depth charts for every team in the league.',
    image:
      'https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
  },
  {
    name: 'Roster Rankings',
    route: ROSTER_ROUTE,
    icon: <ShowChartRounded />,
    description: 'See how your roster ranks amongst the others in overall or position rankings.',
    image:
      'https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
  },
  {
    name: 'Power Rankings',
    route: POWER_RANKING_ROUTE,
    icon: <MultilineChartRounded />,
    description: 'See the overall Fantasy Team power rankings determined by our secret algorithm.',
    image:
      'https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
  },
  {
    name: 'Player Comparison',
    route: PLAYER_COMPARISON_ROUTE,
    icon: <CompareArrowsRounded />,
    description: 'Compare stats of two players.',
    image:
      'https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
  },
];
