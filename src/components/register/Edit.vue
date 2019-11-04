<template lang="pug">
    v-card.elavation-12
        v-card-text
            v-text-field(
                name="item.name",
                :label=" $t('register.name') ",
                v-model="item.name"
                @input="!$v.item.name.$dirty && $v.item.name.$touch()"
                @blur="!$v.item.name.$dirty && $v.item.name.$touch()"
                :error-messages="nameErrors()"
            )
            v-text-field(
                name="item.title",
                :label=" $t('register.title') ",
                v-model="item.title"
                @input="!$v.item.title.$dirty && $v.item.title.$touch()"
                @blur="!$v.item.title.$dirty && $v.item.title.$touch()"
                :error-messages="titleErrors()"
            )
            v-text-field(
                name="item.description",
                :label=" $t('register.description') ",
                v-model="item.description"
                @input="!$v.item.description.$dirty && $v.item.description.$touch()"
                @blur="!$v.item.description.$dirty && $v.item.description.$touch()"
                :error-messages="descriptionErrors()"
            )
        v-card-actions
            v-btn.primary(
                @click="save"
            ) {{ $t('system.save')}}
           
</template>

<script>

import { required } from 'vuelidate/lib/validators'

export default {
    props: ["item"],
    validations() {
        return {
            item: {
                name: { required },
                title: { required },
                description: { required },
            }
        }
    },
    methods: {
        nameErrors() {
            const errors = []
            if (!this.$v.item.name.$dirty) return errors
            !this.$v.item.name.required && errors.push( this.$t('errors.required') )
            return errors
        },
        titleErrors() {
            const errors = []
            if (!this.$v.item.title.$dirty) return errors
            !this.$v.item.title.required && errors.push( this.$t('errors.required') )
            return errors
        },
        descriptionErrors() {
            const errors = []
            if (!this.$v.item.description.$dirty) return errors
            !this.$v.item.description.required && errors.push( this.$t('errors.required') )
            return errors
        },
        async save() {
            this.$v.$touch()
            if( this.$v.$invalid ) {
                this.$notify({
                    group: "alerts",
                    title: this.$t('alert.title'),
                    text: this.$t('alert.text'),
                    type: 'error',
                })
                return
            }

            let resp = await this.$store.dispatch("register/updateRegister", this.item )
            this.$notify({
                group: "alerts",
                title: resp.status,
                text: resp.message,
                type: ( resp.status == 200 ) ? "success" : "error",
            })
            this.$v.item.$reset()
        }
    },
    
}

</script>