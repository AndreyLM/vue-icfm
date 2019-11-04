<template lang="pug">
     v-col(
         cols="12"
     )
        v-card.elevation-12
            v-toolbar.dark(color="primary")
                v-toolbar-title {{ $t('register.title') }}
                v-spacer
            v-card-text
                v-data-table.elevation-1(
                    :headers="headers"
                    :items="registers"
                    class="elevation-1"
                    single-expand=true
                    show-expand
                    disable-pagination=true
                    hide-default-footer
                    @item-expanded="elExpanded"
                )
                    template(
                        v-slot:top
                    )
                        v-toolbar(
                            flat
                            color="white"
                        )
                            v-toolbar-title {{ $t('form.title.list') }}
                            v-spacer
                            v-btn(
                                @click="columnsDisplay"
                            ) {{ $t("system.columns")}}
                           
                        v-row(
                            v-if="showColumn"
                        )
                            v-checkbox.mx-5(
                                v-for="header in defaultHeaders"
                                v-model="header.show"
                                :key="header.value"
                                :label="$t(header.textAlias)"
                            )

                    template(
                        v-slot:item.is_enabled="{ item }"
                    )
                        v-switch(
                            :input-value="item.is_enabled"
                            @change="toggleEnable(item)"
                        )

                    template(
                        v-slot:item.is_active="{ item }"
                    )
                        v-switch(
                            :input-value="item.is_active"
                            @change="toggleActive(item)"
                        )

                    template(
                        v-slot:expanded-item="{ headers }"
                    ) 
                        td(
                            :colspan="headers.length"
                        ) 
                            v-row
                                v-col(cols="12")
                                    edit(
                                        :item="editedItem"
                                    )

</template>

<script>

import { mapState, mapActions } from "vuex"
import Edit from "./Edit"

export default {
    name: "registers",
    components: { Edit },
    data: () => {
        return {
            showColumn: false,
            loading: true,
            search: '',
            dialog: false,
            editedIndex: -1,
            is_new: true,
            editedItem: {
                id: 0,
                name: "",
                title: "",
                description: "",
                is_enabled: 0,
                is_active: 0,
            },
            defaultHeaders: [
                { text: '', textAlias: 'register.id', value: 'id', show: true },
                { text: '', textAlias: 'register.name', value: 'name',  show: true },
                { text: '', textAlias: 'register.description', value: 'description', show: true },
                { text: '', textAlias: 'register.is_enabled', value: 'is_enabled', show: true },
                { text: '', textAlias: 'register.is_active', value: 'is_active', show: true },
            ]
        }
    },

    computed: {
        ...mapState({
            registers: state => state.register.list,
        }),
        headers() {
            return this.defaultHeaders.reduce( ( ac, el ) => {
                el.show && ac.push(el) && ( el.text = this.$t(el.textAlias) )
                return ac
            }  ,  [] ) 
        }
    },
    methods: {
        ...mapActions({
            update: 'register/updateRegister',
        }),
        newRegister() {
            this.dialog = true
        },
        columnsDisplay() {
            this.showColumn = !this.showColumn
        },
        editItem(item) {
            this.editedIndex = this.articles.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },
        toggleActive(item) {
            this.editedItem = Object.assign({}, item)
            this.editedItem.is_active = this.editedItem.is_active ? 0 : 1 
            this.update(this.editedItem)
        },
        toggleEnable(item) {
            this.editedItem = Object.assign({}, item)
            this.editedItem.is_enabled = this.editedItem.is_enabled ? 0 : 1 
            this.update(this.editedItem) 
        },
        elExpanded( { item } ) {
            this.editedItem = Object.assign({}, item)
        },
        close() {
            this.dialog = false
            this.editedItem = {}
        },
        save() {
            if( this.editedIndex > -1 ) {
                Object.assign(this.articles[this.editedIndex], this.editedItem)
            }
            this.close()
        },

    },
    async mounted() {
        await this.$store.dispatch("register/loadList")    
    }
}

</script>

