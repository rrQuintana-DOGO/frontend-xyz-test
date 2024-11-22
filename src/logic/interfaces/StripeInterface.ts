export enum SubscriptionStatus {
    incomplete = 'Incompleta',
    incomplete_expired = 'Incompleta Expirada',
    trialing = 'Demo',
    active = 'Activa',
    past_due = 'Atrasada',
    canceled = 'Cancelada',
    unpaid = 'No pagada',
    paused = 'Pausada',
}

export enum CollectionScheme {
    charge_automatically = 'Cargo automático',
    send_invoice = 'Enviío de factura',
}

export enum PaymentSchemeStatus {
    open = 'Abierto',
    paid = 'Pagado',
    draft = 'Borrador',
    void = 'Anulado',
    uncollectible = 'Incobrable',
}