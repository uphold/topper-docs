---
sidebar_position: 16
---

# Recurring orders

## Overview

Topper has the ability to schedule recurring on-ramp orders.

This feature is available for users from supported countries, who are using supported payment methods. Support can be checked using the `periodicities` property on the payment methods [REST API](/rest-api.md) endpoint.

## Configuration

A scheduled order can be initiated by setting the `periodicity` property in the [bootstrap token payload](/flows/crypto-onramp.mdx#bootstrap-token-payload) as weekly or monthly.

## Scheduling and execution

For `weekly`, scheduled orders are created on the same day of the week that the initial automated order was created - if we create an automated order on Monday, automated orders will be created on Mondays.

For `monthly`, scheduled orders are created on the same day of the month that the initial automated order was created - if we create an automated order on the 16th, automated orders will be created on the 16th of each month. If the next month does not have the same day and the current month (May 31 => June 30), the order will be created on the last day of next month (June 30 in this case).

## Failure & retry policy

If 8 consecutive scheduled orders fail, the automated order is canceled automatically. After cancellation, we will send an email notifying the user.

## Post-order KYC & verification flow

If, after a scheduled order, the user must complete additional verification (e.g., KYC), we will send an email prompting them to open Topper and complete verification.

The automated order will not be paused during this step, meaning that if the user does not take action their scheduled orders may fail.
